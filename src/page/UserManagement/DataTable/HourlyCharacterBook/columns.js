import React from "react"
export const columns =  [
    {
        accessorKey: 'hourlyCharterBookId',
        header: 'ID',
      },    
      {
        accessorKey: 'pickupPhysicalAddress',
        header: 'picku-pPhysical-Address'
        
      },
      {
        accessorKey: 'pickupLongitude',
        header: 'pickup-Longitude',
      },

      {
        accessorKey: 'pickupLatitude',
        header: 'pickup-Latitude',
      },    
      {
        accessorKey: 'dropoffPhysicalAddress',
        header: 'dropoff-Physical-Address',
      },
      {
        accessorKey: 'dropoffLongitude',
        header: 'dropoff-Longitude',
      },

      {
        accessorKey: 'dropoffLatitude',
        header: 'dropoff-Latitude',
      },    
      {
        accessorKey: 'selectedHours',
        header: 'selected-Hours',
      },
      {
        accessorKey: 'occasion',
        header: 'Occasion',
      },

      {
        accessorKey: 'numberOfPassengers',
        header: 'number-Of-Passengers',
      },    
      {
        accessorKey: 'numberOfSuitcases',
        header: 'number-Of-Suitcases',
      },
      {
        accessorKey: 'pickupDateTime',
        header: 'pickup-Date-Time',
      },

      {
        accessorKey: 'specialInstructions',
        header: 'special-Instructions',
      },    
      {
        accessorKey: 'bookingFor',
        header: 'booking-For',
      },
      {
        accessorKey: 'passengerFullName',
        header: 'passenger-FullName',
      },
      {
        accessorKey: 'passengerCellPhone',
        header: 'passenger-CellPhone',
      },


      // {
      //   accessorKey: 'passengerCellPhone',
      //   header: 'passenger-CellPhone',
      // Cell: ({ cell }) => <p>{cell.getValue()[0].destination.name}</p>,
      // },
      // {
      //   accessorKey: 'passengerCellPhone',
      //   header: 'passenger-CellPhone',
      // },
      
      
  ]
