from PIL import Image

def make_white_transparent(img_path, output_path):
    # Open the image and convert it to RGBA
    img = Image.open(img_path).convert("RGBA")
    datas = img.getdata()
    
    new_data = []
    for item in datas:
        # Check if the pixel is near white (R > 240, G > 240, B > 240)
        # item[0] is R, item[1] is G, item[2] is B, item[3] is Alpha
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            # Make it transparent
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Successfully processed {img_path} and saved to {output_path}")

if __name__ == "__main__":
    make_white_transparent("public/logo.png", "public/logo.png")
