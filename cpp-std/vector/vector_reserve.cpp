#include "vector.h"
#include <iostream>
#include <vector>

void vector_reserve_test()
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