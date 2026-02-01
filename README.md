# MasjidOS

**MasjidOS** is a modern, multi-tenant SaaS platform for mosque management. It simplifies financial recording, donation management, activity scheduling, inventory tracking, and more—all in one transparent and easy-to-use dashboard.

![MasjidOS Dashboard](/docs/dashboard_preview.png)

## 🚀 Features

- **Dashboard Overview**: KPI cards, recent transactions, and upcoming events.
- **Finance (Keuangan)**: Record income/expenses, filter by category, and view summaries.
- **Donations (Donasi)**: Manage donors, anonymous donations, and public donation links.
- **Activities (Kegiatan)**: Event calendar, volunteer management, and scheduling.
- **Inventory (Inventaris)**: Track mosque assets, conditions, and values.
- **Documents (Dokumen)**: centralized file storage for proposals and reports.
- **Announcements (Pengumuman)**: Broadcast news to jamaah or internal staff.
- **User Management**: Role-based access control (Admin, Brendahara, Sekretaris, etc.).
- **Audit Log**: Track all system changes for transparency.
- **Mobile App**: Companion app for iOS and Android to manage operations on the go.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [Neon](https://neon.tech/) (Serverless Postgres)
- **Authentication**: [NextAuth.js v5](https://authjs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Mobile**: [React Native](https://reactnative.dev/) / [Expo](https://expo.dev/)

## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/masjidos.git
    cd masjidos
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env.local` file in the root directory:
    ```env
    # Database (Neon)
    DATABASE_URL="postgres://user:pass@ep-xyz.aws.neon.tech/neondb?sslmode=require"

    # Authentication
    AUTH_SECRET="your-generated-secret" # openssl rand -base64 32
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) (or 3001 if 3000 is busy).

## 🔐 Credentials

For demo access, you can use the pre-seeded account:
- **Email**: `admin@demo-masjid.com`
- **Password**: `password123`

## 📦 Project Structure

```
src/
├── app/                  # Next.js App Router
├── components/           # React Components
├── lib/                  # Utilities, DB connection, Constants
├── types/                # TypeScript Interfaces
├── middleware.ts         # Auth Middleware
└── auth.ts               # NextAuth Configuration
```

## 📜 License

[MIT](LICENSE)
