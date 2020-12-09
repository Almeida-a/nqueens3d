def is_safe(board: list, row: int, col: int) -> bool:
    n = len(board)

    # Check this row on left side
    for i in range(col):
        if board[row][i] == 1:
            return False

    # Check upper diagonal on left side
    for i, j in zip(range(row, -1, -1),
                    range(col, -1, -1)):
        if board[i][j] == 1:
            return False

    # Check lower diagonal on left side
    for i, j in zip(range(row, n, 1),
                    range(col, -1, -1)):
        if board[i][j] == 1:
            return False

    return True


def save_in_file(board: list, refresh_file: bool, file_name: str = "tmp.txt"):
    """

    :param refresh_file: delete content (if it is the first iteration
    :param file_name:
    :param board:
    :return: file tmp.txt with position of each queen in each iteration
        One line per iteration, e.g.:
            n arrays of type [1, 0, ..., 0], each with size n
    """

    if refresh_file:
        char = 'w'
    else:
        char = 'a'

    f = None  # compilation fix
    try:
        f = open(file_name, char)
        f.write(f" {board}\n")
    finally:
        f.close()

    return


def solve_nq_util(board: list, col: int) -> bool:
    # base case: If all queens are placed
    # then return true

    n = len(board)

    if col >= n:
        return True


    # Consider this column and try placing
    # this queen in all rows one by one
    for i in range(n):

        if is_safe(board, i, col):

            # Place this queen in board[i][col]
            board[i][col] = 1

            # Save current board positions in file
            save_in_file(board, refresh_file=False)

            # recur to place rest of the queens
            if solve_nq_util(board, col + 1):
                return True

            # If placing queen in board[i][col
            # doesn't lead to a solution, then
            # queen from board[i][col]
            board[i][col] = 0

    # if the queen can not be placed in any row in
    # this colum col then return false
    return False


def print_solution(board):

    n = len(board)

    for i in range(n):
        for j in range(n):
            print(board[i][j], end=" ")
        print()


def run_algorithm(n: int) -> True:
    """

    A utility function to check if a queen can
    be placed on board[row][col]. Note that this
    function is called when "col" queens are
    already placed in columns from 0 to col -1.
    So we need to check only left side for
    attacking queens

    :param n: Number of queens; size of the board
    :return:
    """
    board = [[0] * n for i in range(n)]

    # Open the file, refresh and write the first iteration
    save_in_file(board, refresh_file=True)

    if not solve_nq_util(board, 0):
        print("Solution does not exist")
        return False

    print_solution(board)
    return True


def main():
    print("This program is not to be run directly besides for testing purposes!")
    number = input("Write the dimensions of the board; number of queens: ")
    run_algorithm(n=int(number))


if __name__ == '__main__':
    main()

# This code is contributed by Divyanshu Mehta
# Original code from https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/
# Adapted by André Almeida
