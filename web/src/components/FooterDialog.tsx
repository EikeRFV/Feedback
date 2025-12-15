import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface FooterDialogProps {
  title: string
  children: React.ReactNode
}

export function FooterDialog({ title, children }: FooterDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          {title}
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="text-sm text-muted-foreground leading-relaxed">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}
