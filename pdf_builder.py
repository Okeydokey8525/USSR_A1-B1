import os
import sys
from PIL import Image, ImageDraw, ImageFont

sys.stdout.reconfigure(encoding='utf-8')

FONT_REGULAR = "C:/Windows/Fonts/arial.ttf"
FONT_BOLD = "C:/Windows/Fonts/arialbd.ttf"
FONT_ITALIC = "C:/Windows/Fonts/ariali.ttf"

class PDFDocument:
    def __init__(self, title, subtitle="", level=""):
        self.title = title
        self.subtitle = subtitle
        self.level = level
        self.pages = []
        self.width = 1240  # A4 at ~150 DPI
        self.height = 1754
        self.margin_x = 80
        self.margin_top = 80
        self.margin_bottom = 80
        self.content_width = self.width - 2 * self.margin_x
        
        self.f_title = ImageFont.truetype(FONT_BOLD, 26)
        self.f_h1 = ImageFont.truetype(FONT_BOLD, 20)
        self.f_h2 = ImageFont.truetype(FONT_BOLD, 16)
        self.f_h3 = ImageFont.truetype(FONT_BOLD, 13)
        self.f_body = ImageFont.truetype(FONT_REGULAR, 12)
        self.f_body_bold = ImageFont.truetype(FONT_BOLD, 12)
        self.f_italic = ImageFont.truetype(FONT_ITALIC, 11)
        self.f_small = ImageFont.truetype(FONT_REGULAR, 10)
        self.f_table = ImageFont.truetype(FONT_REGULAR, 11)
        self.f_table_bold = ImageFont.truetype(FONT_BOLD, 11)
        
        self._new_page()
        self._draw_cover_header()

    def _new_page(self):
        img = Image.new('RGB', (self.width, self.height), color='#FFFFFF')
        draw = ImageDraw.Draw(img)
        # Add decorative top & bottom accent lines
        draw.rectangle([(self.margin_x, 40), (self.width - self.margin_x, 43)], fill='#1E3A8A')
        draw.rectangle([(self.margin_x, self.height - 43), (self.width - self.margin_x, self.height - 40)], fill='#1E3A8A')
        
        # Footer
        footer_text = f"TÀI LIỆU TIẾNG NGA TRKI A1-B1 | {self.title}"
        draw.text((self.margin_x, self.height - 35), footer_text, fill='#6B7280', font=self.f_small)
        page_num = f"Trang {len(self.pages) + 1}"
        draw.text((self.width - self.margin_x - 60, self.height - 35), page_num, fill='#6B7280', font=self.f_small)
        
        self.pages.append(img)
        self.current_img = img
        self.current_draw = draw
        self.cur_y = self.margin_top

    def _draw_cover_header(self):
        # Header banner box
        self.current_draw.rounded_rectangle(
            [(self.margin_x, self.cur_y), (self.width - self.margin_x, self.cur_y + 110)],
            radius=8, fill='#F0F4F8', outline='#1E3A8A', width=2
        )
        self.current_draw.text((self.margin_x + 20, self.cur_y + 15), self.title, fill='#1E3A8A', font=self.f_title)
        if self.subtitle:
            self.current_draw.text((self.margin_x + 20, self.cur_y + 55), self.subtitle, fill='#374151', font=self.f_h3)
        if self.level:
            self.current_draw.text((self.margin_x + 20, self.cur_y + 80), f"Khung chuẩn: {self.level} (TRKI / TORFL - Viện Quốc gia Ngôn ngữ Nga Pushkin / SPbGU)", fill='#047857', font=self.f_italic)
        self.cur_y += 135

    def add_heading(self, text, level=1):
        font = self.f_h1 if level == 1 else (self.f_h2 if level == 2 else self.f_h3)
        color = '#1E3A8A' if level == 1 else ('#1F2937' if level == 2 else '#374151')
        h = 30 if level == 1 else (24 if level == 2 else 20)
        
        if self.cur_y + h + 40 > self.height - self.margin_bottom:
            self._new_page()
            
        if level == 1:
            self.current_draw.rectangle([(self.margin_x, self.cur_y), (self.margin_x + 6, self.cur_y + h)], fill='#DC2626')
            self.current_draw.text((self.margin_x + 15, self.cur_y), text, fill=color, font=font)
            self.cur_y += h + 10
            self.current_draw.line([(self.margin_x, self.cur_y), (self.width - self.margin_x, self.cur_y)], fill='#E5E7EB', width=1)
            self.cur_y += 10
        elif level == 2:
            self.current_draw.text((self.margin_x, self.cur_y), text, fill=color, font=font)
            self.cur_y += h + 8
        else:
            self.current_draw.text((self.margin_x, self.cur_y), text, fill=color, font=font)
            self.cur_y += h + 6

    def add_paragraph(self, text, is_bold=False, is_italic=False, color='#1F2937'):
        font = self.f_body_bold if is_bold else (self.f_italic if is_italic else self.f_body)
        words = text.split(' ')
        lines = []
        cur_line = []
        
        # Word wrap estimation
        for w in words:
            test_line = " ".join(cur_line + [w])
            bbox = font.getbbox(test_line)
            line_w = bbox[2] - bbox[0] if bbox else len(test_line) * 7
            if line_w > self.content_width:
                if cur_line:
                    lines.append(" ".join(cur_line))
                    cur_line = [w]
                else:
                    lines.append(w)
                    cur_line = []
            else:
                cur_line.append(w)
        if cur_line:
            lines.append(" ".join(cur_line))
            
        for l in lines:
            if self.cur_y + 20 > self.height - self.margin_bottom:
                self._new_page()
            self.current_draw.text((self.margin_x, self.cur_y), l, fill=color, font=font)
            self.cur_y += 18
        self.cur_y += 6

    def add_callout(self, text, title="GHI CHÚ QUAN TRỌNG / ВАЖНО"):
        if self.cur_y + 80 > self.height - self.margin_bottom:
            self._new_page()
            
        box_y_start = self.cur_y
        self.current_draw.rounded_rectangle(
            [(self.margin_x, box_y_start), (self.width - self.margin_x, box_y_start + 70)],
            radius=6, fill='#FEF3C7', outline='#D97706', width=1
        )
        self.current_draw.text((self.margin_x + 15, box_y_start + 10), title, fill='#92400E', font=self.f_body_bold)
        self.current_draw.text((self.margin_x + 15, box_y_start + 35), text, fill='#78350F', font=self.f_body)
        self.cur_y += 85

    def add_table(self, headers, rows, col_widths=None):
        if not col_widths:
            col_widths = [self.content_width / len(headers)] * len(headers)
            
        # Draw header row
        if self.cur_y + 35 > self.height - self.margin_bottom:
            self._new_page()
            
        row_h = 28
        x = self.margin_x
        # Header background
        self.current_draw.rectangle([(x, self.cur_y), (self.width - self.margin_x, self.cur_y + row_h)], fill='#1E3A8A')
        for i, h in enumerate(headers):
            self.current_draw.text((x + 8, self.cur_y + 6), str(h), fill='#FFFFFF', font=self.f_table_bold)
            x += col_widths[i]
        self.cur_y += row_h
        
        # Rows
        for r_idx, row in enumerate(rows):
            if self.cur_y + row_h > self.height - self.margin_bottom:
                self._new_page()
                # Redraw header on new page
                x = self.margin_x
                self.current_draw.rectangle([(x, self.cur_y), (self.width - self.margin_x, self.cur_y + row_h)], fill='#1E3A8A')
                for i, h in enumerate(headers):
                    self.current_draw.text((x + 8, self.cur_y + 6), str(h), fill='#FFFFFF', font=self.f_table_bold)
                    x += col_widths[i]
                self.cur_y += row_h
                
            bg_color = '#F9FAFB' if r_idx % 2 == 1 else '#FFFFFF'
            x = self.margin_x
            self.current_draw.rectangle([(x, self.cur_y), (self.width - self.margin_x, self.cur_y + row_h)], fill=bg_color)
            self.current_draw.line([(self.margin_x, self.cur_y + row_h), (self.width - self.margin_x, self.cur_y + row_h)], fill='#E5E7EB')
            
            for i, val in enumerate(row):
                val_str = str(val) if val is not None else ""
                self.current_draw.text((x + 8, self.cur_y + 6), val_str, fill='#1F2937', font=self.f_table)
                x += col_widths[i]
            self.cur_y += row_h
        self.cur_y += 15

    def save(self, output_path):
        os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
        first_page = self.pages[0]
        other_pages = self.pages[1:]
        first_page.save(output_path, "PDF", resolution=150.0, save_all=True, append_images=other_pages)
        size_bytes = os.path.getsize(output_path)
        print(f"[PDF GENERATED] {os.path.basename(output_path)} ({len(self.pages)} pages, {size_bytes / (1024*1024):.2f} MB)", flush=True)
        return True, size_bytes
