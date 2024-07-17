const Product = require("../../models/Product");
const Category = require("../../models/Category");
const Brand = require("../../models/Brand");
const { requireAuth } = require("../../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const brandResolvers = {
    Query: {
        brand: async (parent, { _id }, context, info) => {
            try {
                const brand = await Brand.findById(_id)
                    .populate('products')
                    .populate('categories');
                if (!brand) {
                    throw new Error('Brand not found');
                }
                return brand;
            } catch (error) {
                console.error("brand:", error);
                throw error;
            }
        },

        brands: async (parent, args, context, info) => {
            try {
                const brands = await Brand.find()
                    .populate("products")
                    .populate("categories");
                return brands;
            } catch (error) {
                console.error("brands:", error);
                throw error;
            }
        },
    },
    Mutation: {
        addBrand: requireAuth(
            "add_brand",
            async (parent, { brandname, slug, products, imageUrl, categories }, context, info) => {
                try {
                    const userData = context.user;
                    const userRole = userData.role;
                    if (!userData || !userRole) {
                        throw new AuthenticationError("Not authenticated");
                    }

                    const brand = await Brand.create({
                        brandname,
                        slug,
                        products,
                        imageUrl,
                        categories
                    });
                    return brand;
                } catch (error) {
                    console.error("addBrand :", error);
                    throw error;
                }
            }
        ),
        updateBrand: requireAuth(
            "update_brand",
            async (parent, { _id, brandname, slug, products, imageUrl, categories }, context, info) => {
                try {
                    const userData = context.user;
                    const userRole = userData.role;
                    if (!userData || !userRole) {
                        throw new AuthenticationError("Not authenticated");
                    }

                    const updateFields = {
                        brandname,
                        slug,
                        products,
                        imageUrl,
                        categories
                    };

                    Object.keys(updateFields).forEach((key) => {
                        if (updateFields[key] === undefined || updateFields[key] === null) {
                            delete updateFields[key];
                        }
                    });

                    const updatedBrand = await Brand.findByIdAndUpdate(
                        _id,
                        updateFields,
                        { new: true }
                    );
                    return updatedBrand;
                } catch (error) {
                    console.error("updateBrand:", error);
                    throw error;
                }
            }
        ),
        deleteBrand: requireAuth(
            "delete_brand",
            async (parent, { _id }, context, info) => {
                try {
                    const userData = context.user;
                    const userRole = userData.role;
                    if (!userData || !userRole) {
                        throw new AuthenticationError("Not authenticated");
                    }

                    const deletedBrand = await Brand.findOneAndDelete({ _id });
                    if (!deletedBrand) {
                        throw new Error("Brand not found");
                    }

                    await Promise.all([
                        Category.updateMany(
                            { brands: deletedBrand._id },
                            { $pull: { brands: deletedBrand._id } }
                        ),
                        Product.updateMany(
                            { brand: deletedBrand._id },
                            { $unset: { brand: "" } }
                        )
                    ]);

                    console.log("References to the deleted brand have been removed from Categories and Products.");

                    return deletedBrand;
                } catch (error) {
                    console.error("Error in deleteBrand:", error);
                    throw error;
                }
            }
        ),
    }
};

module.exports = brandResolvers;
