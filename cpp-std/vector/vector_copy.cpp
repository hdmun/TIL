#include "vector_copy.h"
#include <iostream>
#include <chrono>
#include <vector>

constexpr int array_size = 1024;
constexpr int simulation_count = 100'000'000;

void _vector_to_array_memcpy(const std::vector<char>& vec)
{
    auto start = std::chrono::steady_clock::now();
    
    for (int i = 0; i < simulation_count; i++) {
        char* array_ = new char[array_size];
        std::memset(array_, 0, sizeof(char) * array_size);
        std::memcpy(array_, vec.data(), sizeof(char) * array_size);
        delete[] array_;
    }

    auto end = std::chrono::steady_clock::now();

    std::cout << "_vector_to_array_memcpy: " << simulation_count << " loops" << std::endl;
    std::cout << "Elapsed time in milliseconds: "
        << std::chrono::duration_cast<std::chrono::milliseconds>(end - start).count()
        << " ms" << std::endl;
}

void _vector_to_array_std_copy(const std::vector<char>& vec)
{
    auto start = std::chrono::steady_clock::now();

    for (int i = 0; i < simulation_count; i++) {
        char* array_ = new char[array_size];
        std::memset(array_, 0, sizeof(char) * array_size);
        std::copy(vec.begin(), vec.end(), array_);
        delete[] array_;
    }

    auto end = std::chrono::steady_clock::now();

    std::cout << "_vector_to_array_std_copy: " << simulation_count << " loops" << std::endl;
    std::cout << "Elapsed time in milliseconds: "
        << std::chrono::duration_cast<std::chrono::milliseconds>(end - start).count()
        << " ms" << std::endl;
}

void vector_copy_test()
{
    std::vector<char> vec;
    vec.reserve(array_size);
    for (int i = 0; i < array_size; i++) {
        vec.push_back(i);
    }
    _vector_to_array_memcpy(vec);
    _vector_to_array_std_copy(vec);
}
