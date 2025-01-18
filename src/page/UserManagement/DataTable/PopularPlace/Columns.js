import { Box } from "@mui/material";

export const columns=[
    {
        accessorKey: 'title',
        header: 'Title',
        // size: 10,

      },  
      // {
      //   accessorKey: 'image',
      //   header: 'popular place Images',
      //   Cell: ({ row }) => (
      //     <Box
      //       sx={{
      //         display: 'flex',
      //         alignItems: 'center',
      //         gap: '1rem',
      //       }}
      //     >
      //       <img
      //         alt="car"
      //         src={row.original.image}
      //         loading="lazy"
      //         style={{ maxHeight: '100px' }} // Set the maximum height for the image
      //       />
      //     </Box>
      //   ),
      // },
      
      {
        accessorKey: 'description',
        header: 'Description',
        // size: 10,

      },   
]