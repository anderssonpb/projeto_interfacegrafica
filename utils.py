import numpy as np
import pandas as pd
from netCDF4 import Dataset
#from sqlalchemy import lateral
import os

# Read dataset
def read_dataset(input_path):
    dataset = Dataset(input_path)
    return dataset

def get_base_variables(dataset):
    # Get time data
    time = np.array(dataset.variables['time'])

    # Get depth data
    depth = np.array(dataset.variables['depth'][:])

    # Get latitide data
    latitude = np.array(dataset.variables['latitude'])

    # Get longitude data
    longitude = np.array(dataset.variables['longitude'])
    return {"time":time,"depth":depth,"lat":latitude,"lon":longitude}
