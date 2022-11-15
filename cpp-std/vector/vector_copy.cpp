#include "vector.h"
#include <iostream>
#include <chrono>
#include <vector>

constexpr int array_size = 1024;
constexpr int simulation_count = 10'000'000;

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


void _array_to_vector_memcpy(char* array_)
{
    auto start = std::chrono::steady_clock::now();

    std::vector<char> vec;
    vec.reserve(array_size);

    for (int i = 0; i < simulation_count; i++) {
        std::memcpy(vec.data(), array_, sizeof(char) * array_size);
    }

    auto end = std::chrono::steady_clock::now();

    std::cout << "_array_to_vector_memcpy: " << simulation_count << " loops" << std::endl;
    std::cout << "Elapsed time in milliseconds: "
        << std::chrono::duration_cast<std::chrono::milliseconds>(end - start).count()
        << " ms" << std::endl;
}


void _array_to_vector_std_copy(char* array_)
{
    auto start = std::chrono::steady_clock::now();

    std::vector<char> vec;
    vec.reserve(array_size);

    for (int i = 0; i < simulation_count; i++) {
        std::copy(array_, array_ + array_size, vec.data());
    }

    auto end = std::chrono::steady_clock::now();

    std::cout << "_array_to_vector_std_copy: " << simulation_count << " loops" << std::endl;
    std::cout << "Elapsed time in milliseconds: "
        << std::chrono::duration_cast<std::chrono::milliseconds>(end - start).count()
        << " ms" << std::endl;
}

void __array_to_vector_std_copy_reserve()
{
    constexpr int array2_size = 10;
    char array2_[5] = { 0, };
    for (int i = 0; i < 5; i++) {
        array2_[i] = i;
    }

    std::vector<char> vec;
    vec.reserve(5);
    std::copy(std::begin(array2_), std::end(array2_), vec.data());

    for (int i = 0; i < 5; i++) {
        std::cout << static_cast<int>(vec[i]) << ", ";
    }
    std::cout << std::endl;

    vec.reserve(array2_size);
    std::copy(std::begin(array2_), std::end(array2_), vec.data() + 5);

    // size는 늘어나지 않음
    std::cout << "vec: " << vec.size() << ", " << vec.capacity() << std::endl;

    for (int i = 0; i < array2_size; i++) {
        std::cout << static_cast<int>(vec[i]) << ", ";
    }
    std::cout << std::endl;
}

void __array_to_vector_std_copy_resize()
{
    constexpr int array2_size = 10;
    char array2_[5] = { 0, };
    for (int i = 0; i < 5; i++) {
        array2_[i] = i;
    }

    std::vector<char> vec;
    vec.resize(5);
    std::copy(std::begin(array2_), std::end(array2_), vec.data());

    for (int i = 0; i < 5; i++) {
        std::cout << static_cast<int>(vec[i]) << ", ";
    }
    std::cout << std::endl;

    vec.resize(array2_size);
    std::copy(std::begin(array2_), std::end(array2_), vec.data() + 5);
    std::cout << "vec: " << vec.size() << ", " << vec.capacity() << std::endl;

    for (int i = 0; i < array2_size; i++) {
        std::cout << static_cast<int>(vec[i]) << ", ";
    }
    std::cout << std::endl;
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

    char array_[array_size] = { 0, };
    for (int i = 0; i < array_size; i++) {
        array_[i] = i;
    }
    _array_to_vector_memcpy(array_);
    _array_to_vector_std_copy(array_);
    
    __array_to_vector_std_copy_reserve();
    __array_to_vector_std_copy_resize();
}
