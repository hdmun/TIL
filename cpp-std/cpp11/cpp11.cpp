// cpp11.cpp : 이 파일에는 'main' 함수가 포함됩니다. 거기서 프로그램 실행이 시작되고 종료됩니다.
//
#include <Windows.h>
#include <iostream>

#include "cpp11.h"

int main()
{
    std::cout << "call cpp11 functions!\n";

    cpp11::thread_main();
    cpp11::move_semantics();
    cpp11::move_instance();
    cpp11::weak_ptr_();
    cpp11::type_cast();
}
