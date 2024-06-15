"use client"



import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoaderIcon, SearchIcon } from "lucide-react"
import { useState } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { searchEmail } from "../backend/rollups-be"
import { ReloadIcon } from "@radix-ui/react-icons"
import Link from "next/link"


export function RollupListFilterComponent() {
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (searchInput === "") {
      return;
    }
    setIsLoading(true);
    const results = await searchEmail(searchInput);
    console.log(results.documents);
    setOpen((open) => !open);
    setSearchResults(results.documents);
    setIsLoading(false);
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2 my-2">
        <Input
          placeholder="Search Rollups..."
          className="h-8 w-[150px] lg:w-[250px]"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          disabled={isLoading}
        />
           <Button
           variant="outline"
            onClick={() => handleSearch()}
            className="h-8 px-2 lg:px-3"
            disabled={isLoading}
          >
            Search
            {isLoading ? 
            <ReloadIcon className="animate-spin ml-2 h-4 w-4" /> 
              :
            <SearchIcon className="ml-2 h-4 w-4" />
            }
          </Button>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
        placeholder="Search rollups..." 
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        />
        <CommandList>
          <CommandEmpty>
            {isLoading && 
              <div className="flex items-center justify-center">
                <LoaderIcon className="animate-spin" />
              </div>
            }
            {!isLoading && `No results found. ${searchResults.length}`}
          </CommandEmpty>
          <CommandGroup heading="Suggestions">
            {searchResults.map((email, index) => (
              <CommandItem key={index} className="cursor-pointer">
                <Link href={`/rollups/view-${email.$id}`} >
                  <span className="font-normal hover:underline">{email.subject} <b>by</b> <span className="font-medium">{email.sender}</span> </span>
                </Link>
            </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </div>
  )
}