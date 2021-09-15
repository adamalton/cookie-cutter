#!/usr/bin/env python

import json
import os
import subprocess

# Get version number
base_dir = os.path.dirname(os.path.dirname(__file__))
manifest_path = os.path.join(base_dir, "src", "manifest.json")
with open(manifest_path, "r") as f:
    manifest = json.loads(f.read())

version = manifest["version"]

archive_path = os.path.join(base_dir, "releases", "%s.zip" % version)

assert not os.path.exists(archive_path), ("Error: zip file for version %s already exists" % version)

src_path = os.path.join(base_dir, "src")

zip_command = ["zip", "-r", archive_path, src_path]

subprocess.call(zip_command)

print("Created zip file for version %s in 'releases'" % version)
