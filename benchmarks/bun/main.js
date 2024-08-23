import { serve } from "bun";


serve({

    port: 8000,
    development: false,
    reusePort: true,

    

    fetch: async (req) => {

            const someDummyDataDict  = {
                name: "John Doe",
                age: 30,
                city: "New York",
                has_children: false,
                titles: ["engineer", "developer", "programmer", "coder"],
                salary: 100000.0,
                is_married: true,
                is_single: false,
                is_divorced: false,
                is_widowed: false,
                is_engaged: false,
                siblings: null,
                parents: null,
                spouse: null,
            }
        
            const jsonResponse = JSON.stringify(someDummyDataDict);
            return new Response(jsonResponse, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        
    }
});