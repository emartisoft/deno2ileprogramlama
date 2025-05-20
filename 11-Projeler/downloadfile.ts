// Download a file from Internet
export async function downloadFile(url: string, dest: string) {
  const res = await fetch(url);
  const fileData = new Uint8Array(await res.arrayBuffer());
  await Deno.writeFile(dest, fileData);
}
