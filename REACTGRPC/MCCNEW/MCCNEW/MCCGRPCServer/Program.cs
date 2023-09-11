using MCCGRPCServer.Infrastructures;
using MCCGRPCServer.Interceptors;
using MCCGRPCServer.Services;
using MCCNew.Domain.Contracts.SID;
using MCCNew.Infra.DapperHelper;
using MCCNew.Services;
using MCCNEW.Infra.DataLayer;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddGrpc(c=>
{ c.EnableDetailedErrors = true;
    c.Interceptors.Add<ExceptionInterceptor>();
});

builder.Services.AddCors(o => o.AddPolicy("AllowAll", builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader()
           .WithExposedHeaders("Grpc-Status", "Grpc-Message", "Grpc-Encoding", "Grpc-Accept-Encoding");
}));
builder.Services.AddGrpcReflection();
builder.Services.AddSingleton<IDapper, Dapperr>();
builder.Services.AddScoped<ISIDRepository ,SIDRepository>();
builder.Services.AddScoped<ISIDServices,SIDServices>();
builder.Services.AddSingleton<ProtoFileProvider>();
var app = builder.Build();

app.UseGrpcWeb();
app.UseCors();
app.MapGrpcService<MCCGRPCServer.Services.v1.SIDService>().EnableGrpcWeb().RequireCors("AllowAll");
app.MapGet("/protos", (ProtoFileProvider protoFileProvider) =>
{
    return Results.Ok(protoFileProvider.GetAll());
});
app.MapGet("/protos/v{version:int}/{protoName}", (ProtoFileProvider protoFileProvider, int version, string protoName) =>
{
    string filePath = protoFileProvider.GetPath(version, protoName);
    if (string.IsNullOrEmpty(filePath))
        return Results.NotFound();
    return Results.File(filePath);
});

app.MapGet("/protos/v{version:int}/{protoName}/view", async (ProtoFileProvider protoFileProvider, int version, string protoName) =>
{
    string fileContent = await protoFileProvider.GetContent(version, protoName);
    if (string.IsNullOrEmpty(fileContent))
        return Results.NotFound();
    return Results.Text(fileContent);
});
app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");


IWebHostEnvironment env = app.Environment;

if (env.IsDevelopment())
{
    app.MapGrpcReflectionService();
}

app.Run();
