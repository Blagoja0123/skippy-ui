'use client';
import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { useRouter, useSearchParams } from 'next/navigation';
  
const PaginationControl = ({hasNext, hasPrev}: {hasNext: Boolean, hasPrev: Boolean}) => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const per_page = searchParams.get('per_page') ?? '15';
  return (
    <Pagination className='mb-8 mt-6'>
      <PaginationContent>
        { hasPrev &&
          <PaginationItem>
            <PaginationPrevious className='cursor-pointer text-xl' onClick={() => router.push(`?page=${Number(page) - 1}&per_page=${per_page}`)} href=''/>
          </PaginationItem>
        }
        <PaginationItem>
          <PaginationLink className=' text-xl'>{page}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis className='text-xl'/>
        </PaginationItem>
        { hasNext &&
          <PaginationItem>
            <PaginationNext className='cursor-ponter text-xl' onClick={() => router.push(`?page=${Number(page) + 1}&per_page=${per_page}`)} href=''/>
          </PaginationItem>
        }
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationControl