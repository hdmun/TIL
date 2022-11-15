// cpp11.cpp : 이 파일에는 'main' 함수가 포함됩니다. 거기서 프로그램 실행이 시작되고 종료됩니다.
//
#include <Windows.h>
#include <iostream>

#include "move_semantics.h"
#include "cpp11_thread.h"

int main()
{
    std::cout << "call cpp11 functions!\n";

    cpp11::move_semantics();

    cpp11::thread_main();
}
