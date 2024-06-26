import { job } from "../models/jobs.js";
import { category } from "../models/categories.js";

/*
 TODO : Add the Tags specified over the job to the Database
*/

class Jobs {
    async addJob(req, res) {
        const jobData = req.body;

        // validating user role
        if (req.user.role !== 'client') {
            return res.status(404).json({
                message: "You are unauthorized to perform this action"
            });
        }

        // validating fields
        if (
            !jobData.title ||
            !jobData.description ||
            !jobData.price ||
            !jobData.category ||
            !jobData.currency ||
            !jobData.time_limit ||
            !jobData.payment_type
        ) {
            return res.status(400).json({
                message: "Please fill all the necesarry fields",
            });
        }

        // validating category
        await category
            .findOne({ name: jobData.category })
            .then((result) => {
                jobData.category_id = result._id;
            })
            .catch(() => {
                return res.status(400).json({
                    message: "Invalid Category",
                });
            });

        const getImagesURL = () => {
            if (!req.body.images) return [];
            
            const images = [];
            if (req.body.images) {
                // converting the string of URLs to array of URLs
                let imgString = req.body.images;
                imgString = imgString.slice(1,-1);
                imgString = imgString.split(',');
                const imgArray = imgString.map(img => img.trim().slice(1, -1))
                imgArray.forEach((image, index) => {
                    images[index] = {
                        image: image
                    }
                });
            }
            return images;
        }

        const finalData = {
            title: jobData.title,
            description: jobData.description,
            category_id: jobData.category_id,
            price: jobData.price,
            currency: jobData.currency,
            time_limit: jobData.time_limit,
            payment_type: jobData.payment_type,
            posted_by: req.user._id,
            images: getImagesURL()
        }

        await job.create(finalData).then((result) => {
            if (result) {
                return res.json({
                    message: "Job posted successfully",
                    job_id: result._id
                });
            }
        }).catch((err) => {
            return res.status(400).json({
                message: "An error occured",
                error: err
            });
        });
    }
}

export const jobs = new Jobs();
