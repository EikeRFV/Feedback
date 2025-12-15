import { ReviewDetails } from "@/components/ReviewDetails";
import { ReviewSidebar } from "@/components/ReviewSidebar";

export default function ReviewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ReviewDetails />
          </div>
          <div className="lg:col-span-1">
            <ReviewSidebar />
          </div>
        </div>
      </main>
    </div>
  )
}
