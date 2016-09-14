import os

PATH = "C:\\Users\\PIP\\Desktop\\wireframes"

for root, dirs, files in os.walk(PATH):

	for name in files:
		os.replace(root + "\\" + name, name.replace(" ", "_"))
		
		print(name)
