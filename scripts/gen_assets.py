import struct, zlib, os

def solid_png(path, size, rgb):
    w = h = size
    r, g, b = rgb
    # one row: filter byte (0) + RGB pixels
    row = b"\x00" + bytes(rgb) * w
    raw = row * h

    def chunk(tag, data):
        c = tag + data
        return struct.pack(">I", len(data)) + c + struct.pack(">I", zlib.crc32(c) & 0xffffffff)

    sig = b"\x89PNG\r\n\x1a\n"
    ihdr = struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0)  # 8-bit, truecolor
    idat = zlib.compress(raw, 9)
    png = sig + chunk(b"IHDR", ihdr) + chunk(b"IDAT", idat) + chunk(b"IEND", b"")
    with open(path, "wb") as f:
        f.write(png)
    print("wrote", path, size, "px")

here = os.path.dirname(os.path.abspath(__file__))
assets = os.path.join(here, "..", "assets")
os.makedirs(assets, exist_ok=True)
blue = (37, 99, 235)
solid_png(os.path.join(assets, "icon.png"), 1024, blue)
solid_png(os.path.join(assets, "adaptive-icon.png"), 1024, blue)
solid_png(os.path.join(assets, "splash.png"), 1284, blue)
solid_png(os.path.join(assets, "favicon.png"), 48, blue)
