'use client';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { login } from '@/lib/auth'
import { getFile, uploadFile } from "@/lib/storage";
import { redirect } from "next/navigation"
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
const Register = () => {

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [formattedData, setFormattedData] = useState({username: "", password:"", image_url:"", liked_categories:[]})
 
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const inputRef = useRef(null);

  useEffect(() => {
      fetch('http://localhost:8000/categories')
        .then(res => res.json())
        .then(data => setCategories(data.data))
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
    // console.log(selectedFile)
  };

  async function handleUpload(){
    const folder = "user/";
    const imagePath = await uploadFile(selectedFile, folder);
    return imagePath;
  }

  function toggleSelect(categoryId) {
    setSelectedCategories((prevSelected) => {
      if(prevSelected.includes(categoryId)){
        return prevSelected.filter(id => (id !== categoryId));
      }else{
        return [...prevSelected, categoryId];
      }
    });
  }
  
  async function handleRegister(formData){
    const filename = await handleUpload();
    const url = await getFile(filename!);
    setFormattedData({username: formData.get('username'), password: formData.get('password'), image_url: url!, liked_categories: selectedCategories, });
    try {
      fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });
    } catch (error) {
        return toast("Error", {
          className: "bg-foreground-dark",
          description: "Something went wrong while registering",
          action: {
              label: "OK",
              onClick: () => {return},
          }
      })
    }
  }

  return (
    <>
      <div className="bg-background-dark flex items-center justify-center min-h-screen">
        <div className="bg-foreground-dark p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-primary text-2xl font-bold mb-6">Register</h1>
          <form id="loginForm" className="space-y-4" action={(formData) => handleRegister(formData)}>
            <div>
              <label htmlFor="username" className="block text-white text-xl font-medium mb-1">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-white text-xl font-medium mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-black"
                placeholder="********"
                required
              />
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="file-upload" className="px-4 py-2 bg-tertiary text-white rounded-lg cursor-pointer hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-primary">
                Browse
              </label>
              <input id="file-upload" type="file" className="hidden" onChange={handleFileChange}/>
              <span id="file-name" className="text-gray-500">{selectedFile ? selectedFile.name : 'No file chosen'}</span>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-tertiary text-white font-bold text-xl rounded-lg hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              Register
            </button>
          </form>
          <h3 className="text-xl font-semibold text-accent-primary mt-8">
            Select Your Interests
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {
                        categories.map((item) => (
    
                            <div key={item.ID} onClick={() => toggleSelect(item.ID)} item-id={item.ID} className={`p-4 bg-background-dark text-center rounded-lg hover:bg-tertiary cursor-pointer ${selectedCategories.includes(item.ID) ? 'bg-tertiary' : ''}`}>
                                <span className="font-bold text-xl">{item.Name}</span>
                            </div>
                        ))
                    }
          </div>
        </div>

      </div>
    </>

  )
}

export default Register