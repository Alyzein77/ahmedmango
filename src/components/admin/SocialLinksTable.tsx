import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, ExternalLink } from "lucide-react";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string | null;
  display_order: number | null;
  is_active: boolean | null;
}

interface SocialLinksTableProps {
  links: SocialLink[];
  onEdit: (link: SocialLink) => void;
  onDelete: (id: string) => void;
}

const SocialLinksTable = ({ links, onEdit, onDelete }: SocialLinksTableProps) => {
  if (links.length === 0) {
    return (
      <div className="bg-card rounded-xl p-12 text-center border border-border">
        <p className="text-muted-foreground font-tajawal text-lg">
          لا توجد روابط تواصل بعد
        </p>
        <p className="text-muted-foreground font-tajawal text-sm mt-2">
          اضغط على "إضافة رابط جديد" للبدء
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="text-right font-tajawal font-semibold">الترتيب</TableHead>
            <TableHead className="text-right font-tajawal font-semibold">المنصة</TableHead>
            <TableHead className="text-right font-tajawal font-semibold">الرابط</TableHead>
            <TableHead className="text-right font-tajawal font-semibold">الحالة</TableHead>
            <TableHead className="text-right font-tajawal font-semibold">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {links.map((link) => (
            <TableRow key={link.id} className="hover:bg-muted/30">
              <TableCell className="font-tajawal font-bold text-center">
                {link.display_order || 0}
              </TableCell>
              <TableCell className="font-tajawal font-medium">
                <div className="flex items-center gap-2">
                  {link.icon && <span className="text-xl">{link.icon}</span>}
                  <span>{link.platform}</span>
                </div>
              </TableCell>
              <TableCell>
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1 text-sm"
                >
                  <span className="truncate max-w-[200px]">{link.url}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    link.is_active
                      ? "bg-primary text-primary-foreground font-tajawal"
                      : "bg-muted text-muted-foreground font-tajawal"
                  }
                >
                  {link.is_active ? "نشط" : "غير نشط"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(link)}
                    className="hover:bg-primary/10 hover:text-primary"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(link.id)}
                    className="hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SocialLinksTable;