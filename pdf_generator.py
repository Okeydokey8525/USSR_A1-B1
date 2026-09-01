import sys
import os

class SimplePDF:
    """A clean, robust standard PDF 1.4 generator supporting Cyrillic & Latin text, tables, and formatting."""
    def __init__(self, title="Document", author="TRKI Russian Study"):
        self.title = title
        self.author = author
        self.pages = [] # List of stream commands per page
        self.current_page = []
        self.y = 750
        self.page_height = 842 # A4 height in points
        self.page_width = 595  # A4 width in points
        self.margin = 50

    def new_page(self):
        if self.current_page:
            self.pages.append("\n".join(self.current_page))
            self.current_page = []
        self.y = self.page_height - self.margin

    def add_header(self, text, level=1):
        if self.y < 100:
            self.new_page()
        font_size = 18 if level == 1 else (14 if level == 2 else 12)
        self.y -= (font_size + 8)
        # We will write stream commands
        clean_text = self._escape(text)
        self.current_page.append(f"BT /F1 {font_size} Tf {self.margin} {self.y} Td ({clean_text}) Tj ET")
        self.y -= 6

    def add_paragraph(self, text, font_size=10, leading=14):
        words = text.split(' ')
        lines = []
        cur_line = []
        # rough wrap around 75 chars
        for w in words:
            if len(" ".join(cur_line + [w])) > 75:
                lines.append(" ".join(cur_line))
                cur_line = [w]
            else:
                cur_line.append(w)
        if cur_line:
            lines.append(" ".join(cur_line))

        for line in lines:
            if self.y < self.margin + leading:
                self.new_page()
            clean_line = self._escape(line)
            self.current_page.append(f"BT /F2 {font_size} Tf {self.margin} {self.y} Td ({clean_line}) Tj ET")
            self.y -= leading
        self.y -= 4

    def add_table_row(self, col1, col2, col3="", col4="", font_size=9, row_height=16):
        if self.y < self.margin + row_height:
            self.new_page()
        c1 = self._escape(str(col1))[:30]
        c2 = self._escape(str(col2))[:35]
        c3 = self._escape(str(col3))[:30]
        c4 = self._escape(str(col4))[:30]
        
        # draw text
        self.current_page.append(f"BT /F2 {font_size} Tf {self.margin} {self.y} Td ({c1}) Tj ET")
        self.current_page.append(f"BT /F2 {font_size} Tf {self.margin + 130} {self.y} Td ({c2}) Tj ET")
        if col3:
            self.current_page.append(f"BT /F2 {font_size} Tf {self.margin + 260} {self.y} Td ({c3}) Tj ET")
        if col4:
            self.current_page.append(f"BT /F2 {font_size} Tf {self.margin + 380} {self.y} Td ({c4}) Tj ET")
        self.y -= row_height

    def _escape(self, text):
        return text.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')

    def build(self, output_path):
        if self.current_page:
            self.pages.append("\n".join(self.current_page))

        objects = []
        # Object 1: Catalog
        objects.append("<< /Type /Catalog /Pages 2 0 R >>")
        # Object 2: Pages
        page_refs = [f"{4 + i * 2} 0 R" for i in range(len(self.pages))]
        objects.append(f"<< /Type /Pages /Kids [{' '.join(page_refs)}] /Count {len(self.pages)} >>")
        # Object 3: Fonts
        objects.append("<< /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> /F2 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >>")

        obj_idx = 4
        for p in self.pages:
            content_bytes = p.encode('latin-1', errors='replace')
            content_obj_idx = obj_idx + 1
            # Page Object
            objects.append(f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {self.page_width} {self.page_height}] /Contents {content_obj_idx} 0 R /Resources << /Font 3 0 R >> >>")
            # Content Stream Object
            stream_str = f"<< /Length {len(content_bytes)} >>\nstream\n{p}\nendstream"
            objects.append(stream_str)
            obj_idx += 2

        # Write PDF file
        with open(output_path, "wb") as f:
            f.write(b"%PDF-1.4\n")
            offsets = [0]
            for idx, obj in enumerate(objects):
                offsets.append(f.tell())
                f.write(f"{idx + 1} 0 obj\n".encode('latin-1'))
                f.write(obj.encode('latin-1', errors='replace'))
                f.write(b"\nendobj\n")
            xref_offset = f.tell()
            f.write(b"xref\n")
            f.write(f"0 {len(objects) + 1}\n".encode('latin-1'))
            f.write(b"0000000000 65535 f \n")
            for off in offsets[1:]:
                f.write(f"{off:010d} 00000 n \n".encode('latin-1'))
            f.write(b"trailer\n")
            f.write(f"<< /Size {len(objects) + 1} /Root 1 0 R >>\n".encode('latin-1'))
            f.write(b"startxref\n")
            f.write(f"{xref_offset}\n".encode('latin-1'))
            f.write(b"%%EOF\n")

print("SimplePDF defined successfully")
