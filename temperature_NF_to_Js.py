import numpy as np
import pandas as pd
from netCDF4 import Dataset
#from sqlalchemy import lateral
import os

from utils import read_dataset,get_base_variables 

def save_temp(df,output_path,filename):
    txt = 'var temperature = ['
    for row, row_data in df.iterrows():
        for col, data in row_data.iteritems():
            if (not pd.isnull(data)):
                txt += '[%f, %f, %f],\n' % (row, col, data)
    txt += ']'

    out_path = os.path.join(output_path,filename)
    with open(out_path, 'w') as f:
        f.write(txt)

#### RUN
def RUN_temp(input_path,output_path,filename,save=True):
    dataset = read_dataset(input_path)
    base_vals = get_base_variables(dataset)
    latitude = base_vals['lat']
    longitude = base_vals['lon']
    temp_data = dataset.variables['thetao'][:]
    temp = temp_data[0][0]
    # Temperatura
    df = pd.DataFrame(temp, index=latitude, columns=longitude)
    df = df.sort_index(ascending=False)    
    #### saving ####
    if save:
        save_temp(df,output_path,filename)


