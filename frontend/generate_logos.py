import os
from PIL import Image, ImageDraw, ImageFont

def create_logo(text, filename, fg_color, bg_color=(0,0,0,0)):
    # 800x200 canvas
    width, height = 800, 200
    image = Image.new("RGBA", (width, height), bg_color)
    draw = ImageDraw.Draw(image)
    
    # Try to load a nice font, fallback to default
    try:
        font = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 100)
        sub_font = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 24)
    except:
        font = ImageFont.load_default()
        sub_font = ImageFont.load_default()

    # Draw the icon (Abstract 'R')
    icon_offset_x = 40
    icon_offset_y = 30
    draw.polygon([(icon_offset_x, icon_offset_y + 140), 
                  (icon_offset_x + 30, icon_offset_y), 
                  (icon_offset_x + 90, icon_offset_y), 
                  (icon_offset_x + 120, icon_offset_y + 70), 
                  (icon_offset_x + 90, icon_offset_y + 140)], 
                 fill="#8b5cf6") # Violet 500
                 
    draw.polygon([(icon_offset_x + 40, icon_offset_y + 140), 
                  (icon_offset_x + 60, icon_offset_y + 40), 
                  (icon_offset_x + 90, icon_offset_y + 40), 
                  (icon_offset_x + 105, icon_offset_y + 80), 
                  (icon_offset_x + 85, icon_offset_y + 140)], 
                 fill="#6366f1") # Indigo 500

    # Draw text
    draw.text((icon_offset_x + 160, 35), "RelayDesk", font=font, fill=fg_color)
    draw.text((icon_offset_x + 165, 145), "CONSTRUCTION MANAGEMENT PLATFORM", font=sub_font, fill="#94a3b8") # Slate 400

    image.save(filename)
    print(f"Generated {filename}")

def create_favicon(filename):
    width, height = 256, 256
    image = Image.new("RGBA", (width, height), (0,0,0,0))
    draw = ImageDraw.Draw(image)
    
    # Draw a larger centered icon
    icon_offset_x = 40
    icon_offset_y = 40
    draw.polygon([(icon_offset_x, icon_offset_y + 176), 
                  (icon_offset_x + 38, icon_offset_y), 
                  (icon_offset_x + 114, icon_offset_y), 
                  (icon_offset_x + 152, icon_offset_y + 88), 
                  (icon_offset_x + 114, icon_offset_y + 176)], 
                 fill="#8b5cf6")
                 
    draw.polygon([(icon_offset_x + 50, icon_offset_y + 176), 
                  (icon_offset_x + 76, icon_offset_y + 50), 
                  (icon_offset_x + 114, icon_offset_y + 50), 
                  (icon_offset_x + 133, icon_offset_y + 100), 
                  (icon_offset_x + 107, icon_offset_y + 176)], 
                 fill="#6366f1")

    image.save(filename)
    print(f"Generated {filename}")

# Generate variants
out_dir = "d:/relaydesk-template/frontend/public"
create_logo("RelayDesk", os.path.join(out_dir, "logo-white.png"), fg_color="#ffffff")
create_logo("RelayDesk", os.path.join(out_dir, "logo-dark.png"), fg_color="#0f1117")
create_logo("RelayDesk", os.path.join(out_dir, "logo.png"), fg_color="#0f1117")
create_favicon(os.path.join(out_dir, "favicon.png"))
