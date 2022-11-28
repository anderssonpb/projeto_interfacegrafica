import os


def delete_file(filename):
    try:
        os.remove(filename)
    except Exception as err:
        print(f"Problem happened while deleting file - Unexpected {err=}, {type(err)=}, {filename}")


def rename_file(from_filename, to_filename):
    try:
        os.rename(from_filename, to_filename)
    except Exception as err:
        print(f"Problem happened while renaming file - Unexpected {err=}, {type(err)=}, {from_filename, to_filename}")


def create_last_files(origin_filename, to_filename):
    rename_file(origin_filename, to_filename)


def rename_data_inside_file(filename, text_to_search, text_to_replace):
    try:
        file = open(filename,'r')
        filedata = file.read()
        file.close()

        newdata = filedata.replace(text_to_search, text_to_replace)

        file = open(filename,'w')
        file.write(newdata)
        file.close()
    except Exception as err:
        print(f"Problem happened while renaming data inside file - Unexpected {err=}, {type(err)=}")


for iteration in range(0, 7, 1):
    if iteration == 0:
        delete_file("salinity"+str(iteration+1)+".js")
        delete_file("temperature"+str(iteration+1)+".js")
        delete_file("wind"+str(iteration+1)+".json")
    else:
        rename_file("salinity"+str(iteration+1)+".js", "salinity"+str(iteration)+".js")
        rename_data_inside_file("salinity"+str(iteration)+".js", "salinity"+str(iteration+1), "salinity"+str(iteration) )

        rename_file("temperature"+str(iteration+1)+".js", "temperature"+str(iteration)+".js")
        rename_data_inside_file("temperature"+str(iteration)+".js", "temperature"+str(iteration+1), "temperature"+str(iteration) )

        rename_file("wind"+str(iteration+1)+".json", "wind"+str(iteration)+".json")


create_last_files("new_file_current_day_wind.json", "wind7.json")
create_last_files("new_file_current_day_temperature.js", "temperature7.js")
create_last_files("new_file_current_day_salinity.json", "salinity7.json")




# Aplica logica de renomeacao
#* Faz um loop de [0 até 7]:
#    - primeira iteracao do loop (iteracao 0) - apaga o arquivo 1
#    - Nas proximas renomeia o arquivo para o numero anterior

# criar Arquivo 7