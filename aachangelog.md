# Changelog

## [0.1.0] - 2024-01-15

### Added
- Initial project setup with Next.js, TypeScript, and Tailwind CSS
- Basic invoice generation functionality
- EditableInvoice component with form fields
- UI components using ShadcN (Button, Input, Label)
- Supabase client configuration
- Project documentation in README.md
- Basic styling and layout structure

### Added in Latest Update
- InvoicePreview component with real-time preview
- Company logo and branding
- Responsive layout with side-by-side editing and preview
- Improved styling and UI consistency
- Better form organization and structure
- PDF export functionality using jsPDF and html2canvas
- Export to PDF with high-quality rendering

### Technical Details
- Set up project dependencies and development environment
- Implemented form state management using React hooks
- Added Lucide icons for better UI/UX
- Created reusable UI components following modern design principles
- Configured Supabase client for future data persistence
- Added SVG logo for better scaling and quality
- Implemented responsive grid layout for better UX
- Added PDF generation utility with proper error handling
- Implemented high-quality PDF export with proper scaling

### Pending
- Word export functionality
- Supabase integration for saving templates
- Form validation
- Add/remove invoice items functionality
- Print styling optimization
- Error notifications for failed exports

## [0.2.0] - 2025-01-17
### Added
- Created responsive Sidebar component with collapsible functionality
  - Added navigation links for Dashboard, Invoices, Sales, Expenses, Profile, and Settings
  - Implemented responsive design that works across all screen sizes
  - Added collapsible functionality with smooth transitions
- Created Navbar component with user profile dropdown
  - Added notifications button
  - Implemented user profile dropdown with quick actions
- Updated root layout to integrate new navigation components
  - Implemented a modern two-panel layout with sidebar and main content area
  - Added proper scrolling behavior for main content

### Technical Details
- Used Next.js 13+ app directory structure
- Implemented components using ShadcnUI for consistent design
- Used Lucide icons for a modern look
- Ensured responsive design using Tailwind CSS
