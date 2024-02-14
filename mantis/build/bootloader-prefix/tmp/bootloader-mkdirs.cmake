# Distributed under the OSI-approved BSD 3-Clause License.  See accompanying
# file Copyright.txt or https://cmake.org/licensing for details.

cmake_minimum_required(VERSION 3.5)

file(MAKE_DIRECTORY
  "/home/jimmy/code/esp-idf/components/bootloader/subproject"
  "/home/jimmy/code/purple-mantis-restoration/mantis/build/bootloader"
  "/home/jimmy/code/purple-mantis-restoration/mantis/build/bootloader-prefix"
  "/home/jimmy/code/purple-mantis-restoration/mantis/build/bootloader-prefix/tmp"
  "/home/jimmy/code/purple-mantis-restoration/mantis/build/bootloader-prefix/src/bootloader-stamp"
  "/home/jimmy/code/purple-mantis-restoration/mantis/build/bootloader-prefix/src"
  "/home/jimmy/code/purple-mantis-restoration/mantis/build/bootloader-prefix/src/bootloader-stamp"
)

set(configSubDirs )
foreach(subDir IN LISTS configSubDirs)
    file(MAKE_DIRECTORY "/home/jimmy/code/purple-mantis-restoration/mantis/build/bootloader-prefix/src/bootloader-stamp/${subDir}")
endforeach()
if(cfgdir)
  file(MAKE_DIRECTORY "/home/jimmy/code/purple-mantis-restoration/mantis/build/bootloader-prefix/src/bootloader-stamp${cfgdir}") # cfgdir has leading slash
endif()
