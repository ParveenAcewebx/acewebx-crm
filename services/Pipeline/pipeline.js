import api from '@/lib/api'

const PipelineStatusServices = {
  addPipelineStatus: formData => {
    return api.post(`/sales-pipelines`, formData)
  },
  getPipelineStatus: (page, length) => {
    if ((page, length)) {
      return api.get(
        `/sales-pipelines?limit=100&page=${page}&per_page=${length}`
      )
    } else {
      return api.get(`/sales-pipelines?limit=100`)
    }
  },

  deletePipelineStatusById: deleteIndex => {
    return api.delete(`/sales-pipelines/${deleteIndex}`)
  },
  getPipelineStatusBYId: id => {
    return api.get(`/sales-pipelines/${id}`)
  },
  updatePipelineStatusById: (formData, id) => {
    return api.put(`/sales-pipelines/${id}`, formData)
  }
}
export default PipelineStatusServices

// sales Pipeline services
export const SalesPipelineServices = {
  addSalesPipeline: data => {
    return api.post(`/sales-pipelines`, data)
  },
  getSalesPipeline: () => {
    return api.get(`/sales-pipelines-leads`)
  },
  updateSalesPipelineRow: data => {
    return api.post(`/pipelines-leads-reorder`, data)
  },
  getSalesPipelineByStatus: id => {
    return api.get(`/sales-pipelines-leads?pipeline_id=${id}`)
  },
  getSalesPipelineByFilter: (assign, company, project, pipelineStatus) => {
    return api.get(
      `/sales-pipelines-leads?pipeline_id=${pipelineStatus}&assignId=${assign}&companyId=${company}&projectId=${project}`
    )
  }
}

//Pipeline Dashboard
export const PipelineDashboardServices = {
  getPipelineDashboard: () => {
    return api.get(`/pipeline-dashboard`)
  }
}
