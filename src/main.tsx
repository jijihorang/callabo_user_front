import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import mainRouter from "./routers/mainRouter.tsx";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={mainRouter}></RouterProvider>
    </QueryClientProvider>
)
