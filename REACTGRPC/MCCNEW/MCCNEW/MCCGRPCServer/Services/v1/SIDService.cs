using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using MCCGRPCServer.Protos.v1;
using MCCNew.Domain.Contracts.SID;
using MCCNew.Domain.Core;
using MCCNEW.Infra.DataLayer;

namespace MCCGRPCServer.Services.v1;

    public class SIDService: MCCGRPCServer.Protos.v1.SID.SIDBase
    {
    private readonly ILogger<SIDService> logger;
    private readonly ISIDServices _sidServices;
    public SIDService(ILogger<SIDService> logger, ISIDServices sidService)
    {
       this.logger = logger;
        this._sidServices = sidService;
    }
    public override async Task InsertSID(IAsyncStreamReader<SIdModel> requestStream, IServerStreamWriter<insertupdatedelete_response> responseStream, ServerCallContext context)
    {
        await foreach (var item in requestStream.ReadAllAsync())
        {
            var serviceResult = _sidServices.InsertSID(new SIDInfo
            {

                SId = item.SId,
                Sidname = item.Sidname,
                Name = item.Name,
                MinValue = item.MinValue,
                MaxValue = item.MaxValue,
                PTFormat = item.PTFormat,
                ValueType = item.ValueType,
                PTCode = item.PTCode,
                Multiplicand = item.Multiplicand,
                totalfact = item.Totalfact,
                Defmode = item.Defmode,
                PID = item.PID,
            });
            //insertupdatedelete_response response = new insertupdatedelete_response();
            await responseStream.WriteAsync(new insertupdatedelete_response { Response = serviceResult.Result, });
        }
        await Task.CompletedTask;
    }
    //public override Task<insertupdatedelete_response> InsertSID(SIdModel request, ServerCallContext context)
    //{ 
    //    SIDInfo sid = new SIDInfo();
    //    sid.SId=request.SId;
    //    sid.Sidname = request.Sidname;
    //    sid.Name = request.Name;
    //    sid.MinValue = request.MinValue;
    //    sid.MaxValue = request.MaxValue;
    //    sid.PTFormat = request.PTFormat;
    //    sid.ValueType = request.ValueType;
    //    sid.PTCode= request.PTCode;
    //    sid.Multiplicand= request.Multiplicand;
    //    sid.totalfact = request.Totalfact;
    //    sid.Defmode = request.Defmode;
    //    sid.PID = request.PID;

    //    insertupdatedelete_response response = new insertupdatedelete_response();
    //    response.Response= _sidServices.InsertSID(sid).Result;
      
    //    return Task.FromResult(response);
    //}

    public override async Task GetSidList(Empty request, IServerStreamWriter<SIdModel> responseStream, ServerCallContext context)
    {
       // SIdResponse response = new SIdResponse();
        var sidlist = _sidServices.GetSidList().Result;
        foreach (var sid in sidlist)
        {
            var s = new SIdModel {
            ParameterId = sid.ParameterId,
            SId = sid.SId,
            Sidname = sid.Sidname,
            Name = sid.Name,
            MinValue = sid.MinValue,
            MaxValue = sid.MaxValue,
            PTFormat = sid.PTFormat,
            ValueType = sid.ValueType,
            PTCode = sid.PTCode,
            Multiplicand = sid.Multiplicand,
            Totalfact = sid.totalfact,
            PID = sid.PID,
            Defmode = sid.Defmode, };
            //response.Sid.Add(s);
           await responseStream.WriteAsync(s);
        }
        await Task.CompletedTask;
    }
    //public override Task<SIdResponse> GetSidList(GetAllRequest request, ServerCallContext context)
    //{
    //    SIdResponse response = new SIdResponse();
    //    List<SIDInfo> sidlist = _sidServices.GetSidList().Result;
    //    foreach (var sid in sidlist)
    //    {
    //        SIdModel s = new SIdModel();
    //        s.ParameterId = sid.ParameterId;
    //        s.SId = sid.SId;
    //        s.Sidname = sid.Sidname;
    //        s.Name = sid.Name;
    //        s.MinValue = sid.MinValue;
    //        s.MaxValue = sid.MaxValue;
    //        s.PTFormat = sid.PTFormat;
    //        s.ValueType = sid.ValueType;
    //        s.PTCode = sid.PTCode;
    //        s.Multiplicand = sid.Multiplicand;
    //        s.Totalfact = sid.totalfact;
    //        s.PID = sid.PID;
    //        s.Defmode = sid.Defmode;
    //        response.Sid.Add(s);
    //    }
    //    return Task.FromResult(response);
    //}
    public override async Task<insertupdatedelete_response> UpdateSID(SIdModel request, ServerCallContext context)
    {
       var serviceresult= await _sidServices.UpdateSID(new SIDInfo { 
        ParameterId = request.ParameterId,
        SId = request.SId,
        Sidname = request.Sidname,
        Name = request.Name,
        MinValue = request.MinValue,
        MaxValue = request.MaxValue,
        PTFormat = request.PTFormat,
        ValueType = request.ValueType,
        PTCode = request.PTCode,
        Multiplicand = request.Multiplicand,
        totalfact = request.Totalfact,
        PID = request.PID,
    });

       
        return new insertupdatedelete_response { Response = serviceresult };
  
        
    }

    //public override Task<insertupdatedelete_response> UpdateSID(SIdModel request, ServerCallContext context)
    //{
    //    SIDInfo sidup = new SIDInfo(); 
    //    sidup.ParameterId= request.ParameterId;
    //    sidup.SId= request. SId;
    //    sidup.Sidname = request.Sidname;
    //    sidup.Name = request.Name;
    //    sidup.MinValue = request.MinValue;
    //    sidup.MaxValue = request.MaxValue;
    //    sidup.PTFormat = request.PTFormat;
    //    sidup.ValueType = request.ValueType;
    //    sidup.PTCode = request.PTCode;
    //    sidup.Multiplicand = request.Multiplicand;
    //    sidup.totalfact = request.Totalfact;
    //    sidup.PID= request.PID;

    //    insertupdatedelete_response response = new insertupdatedelete_response();
    //    response.Response = _sidServices.UpdateSID(sidup).Result;
    //    if (response.Response == false)
    //    {
    //        throw new RpcException(new Status(StatusCode.NotFound, $"Parameter with ID={request.ParameterId} is not found."));
    //    }
    //    //updateContact.FirstName = request.FirstName;
    //    //updateContact.LastName = request.LastName;
    //    //updateContact.Address = request.Address;
    //    //updateContact.City = request.City;
    //    //updateContact.Country = request.Country;
    //    //updateContact.Zipcode = request.Zipcode;

    //    return Task.FromResult(response);
    //}
    public override Task<insertupdatedelete_response> UpdateSIDDefMode(UpdateDefmodResquest updateDefmodResquest, ServerCallContext context)
    { 
        insertupdatedelete_response response = new insertupdatedelete_response();
        response.Response = _sidServices.UpdateSIDDefMode(updateDefmodResquest.Sid, updateDefmodResquest.Defmode).Result;
        return Task.FromResult(response);
    }
}

