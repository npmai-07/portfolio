from PIL import Image
import urllib.request
import io
import math

req = urllib.request.Request('https://lamia.com.vn/storage/anh-seo/mau-pastel-0.jpg', headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        data = response.read()
    img = Image.open(io.BytesIO(data))
    img = img.resize((150, 150))
    img = img.convert('RGB')
    colors = img.getcolors(150*150)
    colors.sort(reverse=True)
    top_colors = []
    for count, color in colors:
        is_unique = True
        for t_c in top_colors:
            dist = math.sqrt(sum((a - b) ** 2 for a, b in zip(color, t_c)))
            if dist < 40:
                is_unique = False
                break
        if is_unique:
            top_colors.append(color)
        if len(top_colors) >= 5:
            break
    for c in top_colors:
        print('#%02x%02x%02x' % c)
except Exception as e:
    print('Error:', e)
