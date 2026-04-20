import os
import glob

files = glob.glob('src/**/*.ts', recursive=True)
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content.replace("'../prisma/prisma.module'", "'./prisma/prisma.module'")
    new_content = new_content.replace("'../../prisma/prisma.module'", "'../prisma/prisma.module'")
    new_content = new_content.replace("'../../prisma/prisma.service'", "'../prisma/prisma.service'")
    new_content = new_content.replace("'../../../prisma/prisma.module'", "'../../prisma/prisma.module'")
    new_content = new_content.replace("'../../../prisma/prisma.service'", "'../../prisma/prisma.service'")
    new_content = new_content.replace("'../prisma/prisma.service'", "'./prisma/prisma.service'") # if app.controller uses it
    
    if content != new_content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed imports in {file}")
