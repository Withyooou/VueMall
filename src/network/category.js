import request from "./request.js";

export function getCategory() {
  return request({
    url: '/api/w6/category'
  })
}

export function getSubcategory(maitKey) {
  return request({
    url: '/api/w6/subcategory',
    params: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: '/api/w6/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}
