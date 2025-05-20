// For Linux/MacOS
// gcc -shared -o libadder.so adder.c

// For Window
// gcc -shared -o adder.dll adder.c

#include <stdint.h>

int32_t add(int32_t a, int32_t b) {
    return a + b;
}
