import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Kitaplar Fresh Uygulama Örneği</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="flex justify-center items-center mx-auto">
        <Component />
      </body>
    </html>
  );
}
