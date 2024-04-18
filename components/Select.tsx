"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState, useEffect } from 'react';
import { API } from '@/utils/api.service';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import useSnackbar from '@/utils/useSnackbar';
import { useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

export default function BasicSelect({ handlePopupclose }: any) {
  const [accounts, setAccounts] = useState<any>([]);
  const username = Cookies.get('email') || '';

  const addSnackbar = useSnackbar();
  const searchParams = useSearchParams();

  const handleChange = (event: SelectChangeEvent) => {
    const email = event.target.value;

    API.post('/sendEmail/' + email, { boardId: searchParams.get('id') || '' }).then((res: any) => {
      if (res.data.message == 'Email Sent Successfully')
        addSnackbar({
          key: "success",
          text: `Invitation sent to ${email}`,
          variant: "success",
          icon: CheckCircleIcon
        })
    })
    handlePopupclose(false)
  };

  useEffect(() => {
    API.get('/users').then((res: any) => {
      console.log(res.data)
      if (res.data.message?.length) {
        let accounts = res.data.message;
        accounts = accounts.filter((item: any) => item.email != username)
        setAccounts(accounts);
      }
      else {
        addSnackbar({
          key: "warning",
          text: "Something went wrong while fetching user details",
          variant: "warning",
          icon: CheckCircleIcon
        })
      }

    }, err => {
      console.log(err.message)
    })
  }, [])

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Account:</InputLabel>
        {accounts?.length && <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Select Account"
          onChange={handleChange}
        >
          {accounts?.length && accounts.map((item: any, index: number) => <MenuItem key={index} value={item.email}>{item.email}</MenuItem>)}
        </Select>}
      </FormControl>
    </Box>
  );
}