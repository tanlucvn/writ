// Generate an embed URL from known services
export function getEmbedUrl(url: string | null): string | null {
  if (!url) return null;

  if (url.includes("youtube.com")) {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  if (url.includes("figma.com")) {
    const fileId = url.split("file/")[1]?.split("/")[0];
    return `https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/${fileId}`;
  }

  if (url.includes("loom.com")) {
    const videoId = url.split("share/")[1];
    return `https://www.loom.com/embed/${videoId}`;
  }

  return url;
}
