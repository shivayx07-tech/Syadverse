import { describe, expect, it } from "vitest";
import { certificatesArchive, certificateCategories } from "@/data/certificatesArchive";

describe("Syadverse Certificate Vault Archive", () => {
  it("contains all verified certificates from the archive", () => {
    expect(certificatesArchive.length).toBeGreaterThanOrEqual(30);
  });

  it("ensures every certificate has required fields and valid asset paths", () => {
    certificatesArchive.forEach((cert) => {
      expect(cert.id).toBeTruthy();
      expect(cert.title).toBeTruthy();
      expect(cert.issuer).toBeTruthy();
      expect(cert.category).toBeTruthy();
      expect(certificateCategories).toContain(cert.category);
      expect(cert.displayImage).toMatch(/^\/certificates\/display\/.+\.webp$/);
      expect(cert.thumbnailImage).toMatch(/^\/certificates\/thumbnails\/.+-thumb\.webp$/);
      expect(cert.documentPath).toMatch(/^\/certificates\/documents\/.+$/);
      expect(cert.width).toBeGreaterThan(0);
      expect(cert.height).toBeGreaterThan(0);
      expect(["landscape", "portrait", "square"]).toContain(cert.orientation);
    });
  });

  it("verifies key real certificates are present", () => {
    const ids = certificatesArchive.map((c) => c.id);
    expect(ids).toContain("cert-azure-ai");
    expect(ids).toContain("cert-oracle-ai");
    expect(ids).toContain("cert-nasa-open-science");
    expect(ids).toContain("cert-isro-remote-sensing");
    expect(ids).toContain("cert-isro-hackathon");
    expect(ids).toContain("cert-isro-space-quiz");
    expect(ids).toContain("cert-csjmu-matlab");
    expect(ids).toContain("cert-iitk-cybersecurity");
    expect(ids).toContain("cert-iitk-trips");
    expect(ids).toContain("cert-dreamflow-buildathon");
  });

  it("ensures category filtering partitions the collection cleanly", () => {
    const allCategories = certificateCategories.filter((c) => c !== "All");
    allCategories.forEach((cat) => {
      const itemsInCat = certificatesArchive.filter((c) => c.category === cat);
      expect(itemsInCat.length).toBeGreaterThan(0);
    });
  });
});
