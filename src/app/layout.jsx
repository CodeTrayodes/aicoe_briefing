import '../styles/globals.css';

export const metadata = {
  title: 'LevelShift Intelligence',
  description: 'Daily AI briefing platform for the LevelShift team.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full m-0 p-0">{children}</body>
    </html>
  );
}
