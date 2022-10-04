import numpy as np
import pandas as pd
from netCDF4 import Dataset
#from sqlalchemy import lateral
import os
import json
import glob

from utils import read_dataset,get_base_variables 
from temperature_NF_to_Js import save_temp,RUN_temp
from salinity_NF_to_Js import save_sal,RUN_sal
from wind_NF_to_Js import save_wind,RUN_wind


input_folder = r'.\andersson\data\input\*.nc'
output_folder = r'.\andersson\data\output'
for file_path in glob.glob(input_folder):
    #dataset = read_dataset(file_path)
    #base_vals = get_base_variables(dataset)
    print(file_path.split('\\')[-1])
    data = file_path.split('\\')[-1].split('_')[1][-2:]
    
    RUN_temp(file_path,output_folder,'temperature_'+data+'.js',True)
    RUN_sal(file_path,output_folder,'salinity_'+data+'.js',True)
    RUN_wind(file_path,output_folder,'wind_'+data+'.js',True)