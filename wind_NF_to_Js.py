import numpy as np
import pandas as pd
from netCDF4 import Dataset
#from sqlalchemy import lateral
import os
import json

from utils import read_dataset,get_base_variables 

def save_wind(wind_data,output_path,filename):
    import json
    out_path = os.path.join(output_path,filename)
    with open(out_path, 'w') as outfile:
        json.dump(wind_data, outfile, separators=(',', ':'), indent=4)



def RUN_wind(input_path,output_path,filename,save=True):
    dataset = read_dataset(input_path)
    base_vals = get_base_variables(dataset)
    latitude = base_vals['lat']
    longitude = base_vals['lon']

    u_data = dataset.variables['uo'][:]
    u = u_data[0][0]
    dfu = pd.DataFrame(u, index=latitude, columns=longitude)
    dfu = dfu.sort_index(ascending=False)

    v_data = dataset.variables['vo'][:]
    v = v_data[0][0]
    dfv = pd.DataFrame(v, index=latitude, columns=longitude)
    dfv = dfv.sort_index(ascending=False)


    x = len(longitude)
    y = len(latitude)

    # Criar arquivo de saida
    nx = x
    ny = y
    dx = float(np.diff(longitude).mean())
    dy = float(np.diff(latitude).mean())
    tot = nx*ny
    la1,la2 = float(max(latitude)), float(min(latitude))
    lo1,lo2 = float(min(longitude)), float(max(longitude))
    udata = np.nan_to_num(dfu.values.flatten()*10)
    vdata = np.nan_to_num(dfv.values.flatten()*10)

    wind_data = [{
    "header": {
        "parameterNumberName": "eastward_wind",
        "parameterUnit": "m.s-1",
        "parameterNumber": 2,
        "parameterCategory": 2,
        "nx": nx,
        "ny": ny,
        "numberPoints": tot,
        "dx": dx,
        "dy": dy,
        "la1": la1,
        "lo1": lo1,
        "la2": la2,
        "lo2": lo2,
    #     "refTime": "2017-02-01 23:00:00"
    },
    "data": list(udata)
    }, {
    "header": {
        "parameterNumberName": "northward_wind",
        "parameterUnit": "m.s-1",
        "parameterNumber": 3,
        "parameterCategory": 2,
        "nx": nx,
        "ny": ny,
        "numberPoints": tot,
        "dx": dx,
        "dy": dy,
        "la1": la1,
        "lo1": lo1,
        "la2": la2,
        "lo2": lo2,
    #     "refTime": "2017-02-01 23:00:00"
    },
    "data": list(vdata)
    }]

    #### saving ####
    if save:
        save_wind(wind_data,output_path,filename)
