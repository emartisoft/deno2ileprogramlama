function getPlatformInfo(): string {
  const platform = Deno.build.os; // Deno'dan platform bilgisini al
  switch (platform) {
    case "windows":
      return "Windows";
    case "darwin":
      return "macOS";
    case "linux":
      return "Linux";
    default:
      return "Bilinmeyen bir platform";
  }
}

console.log(getPlatformInfo());
