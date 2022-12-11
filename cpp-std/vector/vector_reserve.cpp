#include "vector.h"
#include <iostream>
#include <vector>

void basic_test()
{
    std::cout << std::endl << "vector_reserve_test" << std::endl;

    std::vector<char> vec;
    vec.reserve(5);
    for (int i = 0; i < 5; i++) {
        vec.push_back(i);
    }

    vec.reserve(10);

    for (int i = 0; i < vec.size(); i++) {
        std::cout << static_cast<int>(vec[i]) << ", ";
    }
    std::cout << std::endl;
}

void resize_after_reserve()
{
    std::cout << std::endl << "resize_after_reserve" << std::endl;

    std::vector<int> vec;
    vec.reserve(10);
    std::cout << "size: " << vec.size() << ", capacity: " << vec.capacity() << ", address: " << vec.data() << std::endl;

    vec.resize(5);
    std::cout << "size: " << vec.size() << ", capacity: " << vec.capacity() << ", address: " << vec.data() << std::endl;
}


void vector_reserve_test()
{
    basic_test();
    resize_after_reserve();
}