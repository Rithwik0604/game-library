import time

def slowFunction():
    print('started')
    time.sleep(5)
    print('ended')


print('calling function')
slowFunction()
print('program over')