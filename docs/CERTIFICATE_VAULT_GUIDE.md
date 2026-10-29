# Syadverse — Certificate Vault Maintenance Guide

This document describes how the Certificate Vault (`#certificates`) is structured and how to add new certificates in the future.

---

## 1. Asset Storage Locations

All certificate assets reside within `/public/certificates/`:

- **Original Documents (PDFs / High-Res Images):**
  `/public/certificates/documents/<filename>`
  _Purpose:_ Download and "Original Document" direct link in the viewer modal.

- **Display WebP Images (Full Resolution, optimized):**
  `/public/certificates/display/<basename>.webp`
  _Purpose:_ High-resolution rendering in the main active carousel card and the fullscreen lightbox. Max width 1600px.

- **Thumbnail WebP Images:**
  `/public/certificates/thumbnails/<basename>-thumb.webp`
  _Purpose:_ Instant rendering in the filmstrip preview strip. Max dimensions 480x480px.

---

## 2. Adding a New Certificate

To add a new certificate, append an entry to `certificatesArchive` in [`src/data/certificatesArchive.ts`](file:///Users/shivay/Downloads/04879772-dcbe-4bfa-893b-d9b8aaaa6486/src/data/certificatesArchive.ts):

```typescript
{
  id: "cert-unique-slug",
  title: "Official Certificate Title",
  issuer: "Issuing Organization",
  date: "Month DD, YYYY",
  year: "2026",
  category: "AI & Machine Learning", // See available categories below
  credentialId: "OPTIONAL-CREDENTIAL-ID",
  certificationNumber: "OPTIONAL-CERT-NUMBER",
  verificationUrl: "https://example.com/verify/...", // Optional
  originalFilename: "Certificate_File.pdf",
  displayImage: "/certificates/display/Certificate_File.webp",
  thumbnailImage: "/certificates/thumbnails/Certificate_File-thumb.webp",
  documentPath: "/certificates/documents/Certificate_File.pdf",
  width: 1600,
  height: 1200,
  orientation: "landscape", // "landscape" | "portrait" | "square"
  description: "Concise summary of the credential topics and skills covered."
}
```

---

## 3. Supported Categories

The vault dynamically partitions items into the following categories:

- `All` (Auto-calculated aggregate count)
- `AI & Machine Learning`
- `Space Science & Research`
- `Cloud, Data & DevOps`
- `Cybersecurity`
- `Hackathons & Competitions`
- `Development & Workshops`

Category counts are calculated in real time directly from the `certificatesArchive` array:

```typescript
const categoryCounts = useMemo(() => { ... }, []);
```

There is no hardcoded certificate count. Adding an entry automatically updates the total and category badges.

---

## 4. Generating WebP Display & Thumbnails

For quick processing of new PDFs or images into `.webp` format:

```bash
# Convert PDF to high-res thumbnail:
qlmanage -t -s 1600 -o /tmp/ "path/to/certificate.pdf"

# Convert to WebP using python Pillow or cwebp:
python3 -c "
from PIL import Image
im = Image.open('/tmp/certificate.pdf.png').convert('RGB')
im.save('public/certificates/display/certificate.webp', 'WEBP', quality=90)
im.thumbnail((480, 480))
im.save('public/certificates/thumbnails/certificate-thumb.webp', 'WEBP', quality=85)
"
```

---

## 5. Architectural Verification & Testing

Run tests to verify data integrity:

```bash
npm test -- --run
npm run build
```

The automated test suite in [`src/test/certificates-vault.test.tsx`](file:///Users/shivay/Downloads/04879772-dcbe-4bfa-893b-d9b8aaaa6486/src/test/certificates-vault.test.tsx) validates asset paths, categories, and required metadata fields automatically.
