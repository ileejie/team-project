import request from "@/utils/request";

export function newsList(params) {
  return request({
    url: `/home/newsList`,
    method: "get",
    params,
  });
}
