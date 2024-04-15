import { CImage } from "@coreui/react"
import { Box } from "@mui/material";
import React from "react"
import { Link, useLocation } from "react-router-dom";


 
export const columns =  [
    {
        accessorKey: 'carId',
        header: 'ID',
        // size: 10,

      },    
      {
        accessorKey: 'carName',
        header: 'Car Name'
        
      },
      {
        accessorKey: 'carImageUrl',
        header: 'Car Images',
        Cell: ({ row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <img
              alt="car"
              src={row.original.carImageUrl}
              loading="lazy"
              style={{ maxHeight: '100px' }} // Set the maximum height for the image
            />
          </Box>
        ),
      },

      {
        accessorKey: 'carDescription',
        header: 'Car Description',
      },    
      {
        accessorKey: 'maxSuitcases',
        header: 'Max Suit Cases',
      },
      {
        accessorKey: 'carType',
        header: 'Car Type',
      },
      {
        accessorKey: 'pricePerMile',
        header: 'Price Pre Mile',
      

      // Cell: ({ cell }) => <p>{cell.getValue()[0].destination.name}</p>,
      // Cell: ({ cell }) => <p>{console.log('sss',cell.getValue()[0]?.destination.name)}</p>,
    },
    // {
    //   accessorKey: 'currency',
    //   header: 'Currency',
    // },
    // {
    //   accessorKey: 'engineType',
    //   header: 'Engine type',
    // },
    // {
    //   accessorKey: 'length',
    //   header: 'Length',
    // },
    // {
    //   accessorKey: 'interiorColor',
    //   header: 'Interior Color',
    // },
    // {
    //   accessorKey: 'exteriorColor',
    //   header: 'Exterior Color',
    // },
    // {
    //   accessorKey: 'power',
    //   header: 'Power',
    // },
    // {
    //   accessorKey: 'transmissionType',
    //   header: 'Transmission Type',
    // },
    // {
    //   accessorKey: 'fuelType',
    //   header: 'Fuel Type',
    // },
    // {
    //   accessorKey: 'extras',
    //   header: 'Extras',
    // }
   
  ]

 