
import React from "react"
export const columns =  [
    {
        accessorKey: 'pointToPointBookId',
        header: 'ID',
      },    
      {
        accessorKey: 'tripType',
        header: 'Trip Type'
        
      },
      {
        accessorKey: 'pickupPhysicalAddress',
        header: 'PickUp physical Address',
      },

      // {
      //   accessorKey: 'pickupLongitude',
      //   header: 'PickUp Longitude',
      // },    
      // {
      //   accessorKey: 'pickupLatitude',
      //   header: 'PickUp latitude',
      // },
      {
        accessorKey: 'dropoffPhysicalAddress',
        header: 'Dropoff Physical Address',
      },
    //   {
    //     accessorKey: 'dropoffLongitude',
    //     header: 'Dropoff Longitude',
      

    //   // Cell: ({ cell }) => <p>{cell.getValue()[0].destination.name}</p>,
    //   // Cell: ({ cell }) => <p>{console.log('sss',cell.getValue()[0]?.destination.name)}</p>,
    // }, 
    {
      accessorKey: 'paymentStatus',
      header: 'Payment Status',
    
  },

  {
    accessorKey: 'bookingStatus',
    header: 'Booking Status',
  
},

    // {
    //   accessorKey: 'dropoffLatitude',
    //   header: 'Dropoff Latitude',
    // }
  ]

 