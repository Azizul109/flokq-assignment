// src/app/layout.js
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata = {
  title: 'AutoParts Pro - Premium Auto Parts',
  description: 'Your trusted partner for quality auto parts and accessories',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
          rel="stylesheet" 
        />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
        
        {/* Bootstrap JS */}
        <script 
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" 
          async
        ></script>
      </body>
    </html>
  );
}